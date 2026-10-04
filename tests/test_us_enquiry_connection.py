"""Reject destructive or unrelated CloudFormation changes before execution."""
import importlib.util
from pathlib import Path
import sys
import unittest
from unittest.mock import patch
from test_applications import fake_boto

with patch.dict(sys.modules, {'boto3': fake_boto}):
    spec = importlib.util.spec_from_file_location('connect_us_enquiries',
        Path(__file__).resolve().parents[1] / 'scripts/connect-us-enquiry-admin.py')
    connection = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(connection)


class ConnectionBoundaryTests(unittest.TestCase):
    def test_only_non_replacing_modifications_to_existing_handler_and_role_are_allowed(self):
        allowed = [dict(LogicalResourceId=name, Action='Modify', Replacement='False')
                   for name in ('Handler', 'ExecutionRole')]
        connection.validate_changes(allowed)
        for name in ('Admins', 'Applications', 'AdminClient', 'Api', 'Authorizer'):
            with self.assertRaises(RuntimeError):
                connection.validate_changes(allowed + [dict(LogicalResourceId=name,
                    Action='Modify', Replacement='False')])
        for action, replacement in [('Add', 'False'), ('Remove', 'False'),
                                    ('Modify', 'True'), ('Modify', 'Conditional')]:
            with self.assertRaises(RuntimeError):
                connection.validate_changes([dict(LogicalResourceId='Handler',
                    Action=action, Replacement=replacement)])
        with self.assertRaises(RuntimeError):
            connection.validate_changes([])
