#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BUGWORLD 2026 — MCP Message Bus Service
Spec: v260303.1 | Session: DBUG 260303 (1)
Constraint: zero_china_dependencies
Identity: dbug. / admin. (Trailing Period Enforced)
"""

import json
import os
from flask import Flask, jsonify, request
from datetime import datetime, timezone

app = Flask(__name__)

# Load config
CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config.json')
with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    CONFIG = json.load(f)

# Core identity enforcement (per identity.json)
CORE_IDENTITY = CONFIG.get('core_identity', 'dbug.')
ADMIN_IDENTITY = CONFIG.get('admin_identity', 'admin.')
TRAILING_PERIOD_ENFORCED = CONFIG.get('trailing_period_enforced', True)

def validate_identity_format(role: str) -> bool:
    """Enforce trailing period for core identities per identity.json"""
    if role in ['dbug', 'admin'] and not role.endswith('.'):
        return False
    return True

@app.route(CONFIG['message_bus']['health_endpoint'], methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'spec': CONFIG['spec'],
        'session': CONFIG['session_id'],
        'identity': CORE_IDENTITY,
        'timestamp': datetime.now(timezone.utc).isoformat()
    })

@app.route('/session/init', methods=['POST'])
def session_init():
    """Initialize session — requires admin triad per privilege_gates.json"""
    data = request.get_json() or {}
    triad = data.get('triad_members', [])
    
    required = CONFIG['triad_validation']['required_members']
    if set(triad) != set(required):
        missing = list(set(required) - set(triad))
        return jsonify({
            'error': 'TRIAD_INCOMPLETE',
            'missing': missing,
            'required': required
        }), 403
    
    return jsonify({
        'status': 'initialized',
        'session_id': CONFIG['session_id'],
        'triad': triad
    })

@app.route('/identity/validate', methods=['POST'])
def validate_identity():
    """Validate identity format per identity.json"""
    data = request.get_json() or {}
    role = data.get('role', '')
    
    if TRAILING_PERIOD_ENFORCED and not validate_identity_format(role):
        return jsonify({
            'valid': False,
            'error': 'TRAILING_PERIOD_REQUIRED',
            'message': f"'{role}' missing trailing period. Expected: 'dbug.' or 'admin.'"
        }), 400
    
    return jsonify({'valid': True, 'role': role})

if __name__ == '__main__':
    host = CONFIG['message_bus']['host']
    port = CONFIG['message_bus']['port']
    print(f"[MCP] Starting BUGWORLD Message Bus — Spec: {CONFIG['spec']}")
    print(f"[MCP] Identity: {CORE_IDENTITY} (trailing_period_enforced={TRAILING_PERIOD_ENFORCED})")
    app.run(host=host, port=port)