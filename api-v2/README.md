# go api v2

### Requirements
create a `.env` file in the root of this directory with the following variables
```
HTTP_PORT=8181
HTTPS_PORT=8182

```
install dependenices: 
```shell
go mod download 
```

### Todo
- [ ] jwt token auth & cookies
- [ ] database orm w/ gorm
    - [ ] user model & CRUD
    - [ ] scrobble model & CRUD
    - [ ] lastfm & discogs oauth credential models & CRUD
- [ ] implement providers
    - [ ] lastfm
        - [ ] srobbling
        - [ ] oauth
    - [ ] discogs
        - [ ] oauth 
        - [ ] query user collection
- [ ] setup router
    - [ ] migrate all routes from `v1` api to `v2`
    - [ ] protected routes
