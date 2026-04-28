# Fixing `relay/unused-fields` errors

This rule fires when a GraphQL field is queried but not accessed in the same file.

## Causes

### Field belongs in a child component's fragment

The field is consumed by a child component, not this file. Move it into the child's fragment — create one if it doesn't exist yet. If a component accepts multiple fields from the same object, it conceptually depends on that object and should define a fragment for it.

### Field is genuinely unused

The code that used this field was removed. Remove the field from the query or fragment.
