# delete_migrations.py
import os
import glob

for root, dirs, files in os.walk('.'):
    if 'migrations' in dirs:
        migration_path = os.path.join(root, 'migrations')
        for file in glob.glob(os.path.join(migration_path, '*.py')):
            if file.endswith('__init__.py'):
                continue
            os.remove(file)
        for file in glob.glob(os.path.join(migration_path, '*.pyc')):
            os.remove(file)
print("Migration files cleaned.")
