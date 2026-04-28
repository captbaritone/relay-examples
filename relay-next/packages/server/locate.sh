#!/bin/bash
# Locate command for Relay's VS Code extension.
# Called by the Relay LSP with a project name and entity like "default User.name".
# Returns the source location in the format "filepath:line:column".
cd "$(dirname "$0")"
exec npx grats locate "$2"
