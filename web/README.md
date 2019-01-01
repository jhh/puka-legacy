# Puka Web

## Sort Dev Bookmarks

```
cat dev-bookmarks.json | jq -c 'sort_by(.title)' | pbcopy
```

## Deploy Instructions

```
npm install
npm run clean
npm run build
tar czf puka.tgz output
scp puka.tgz silicon:
```

Then extract and copy over `/srv/puka`

## Old Deploy Instructions

- Edit `src/app/dev-bookmarks.json`
- `npm run start` - start a web development server
- `npm run clean` - clean build dir
- `npm run build` - build
- Go up to `puka` dir
- `docker-compose build web`
- `docker-compose push web`
- `docker-compose down`
- `docker-compose up -d`
