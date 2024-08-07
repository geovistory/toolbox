# Test

This directory holds pgTap files ending on .sql organized in subfolders:

```bash
test/
├── integration/ # test collaboration of multiple triggers/functions
├── performance/ # test performance e.g. with perform_ok() or perform_within()
├── units/
    ├── functions/ # test a single function
    ├── triggers/ # test a single trigger
```
