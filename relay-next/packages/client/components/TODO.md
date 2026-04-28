# Demo

- Defer
- Stream
- Search
- Modal
- 3D

# TODO

- [ ] Infinite scroll with connection pagination
- [ ] Make composer richer to be client heavy
- [ ] Subscriptions (Likes from another tab)
- [ ] Validate defer fetch implementation
- [ ] Improve stream API to be typesafe
- [ ] Typeahead example using server rendered components

## Known Gaps

- When adding a comment we don't have any way to refetch just the new comment,
  we have to update the whole page because revalidate is route-based.
- Infinite scroll pagination cannot be done without reloading the whole page each time?
