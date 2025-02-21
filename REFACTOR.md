## Post username
```js
if(!username) {
    return Error
}

const isTracked = checkForTrackedUser()

if(isTracked) routeToCollectionUsername()

const bggUser = getBGGUser()

if(!bggUser) return Error("not a valid bgg username")

saveUserToTrackedUsers(bggUser)

startTracking(username)

async function startTracking(username) {
    const bggRes = await getBGGCollection()
    if(status === 202) {
        kv.enqueue({type: 'initializeTracking', username}, {delay})
        ctx.response.status = 200,
        ctx.reponse.body = {
            message: "tracking initialized"
        }
    }

    if(status !== 200) {
        throw new Error(
            `Error getting collection for ${username} - status ${res.status}`
        );
    }

    if (res?.status === 200 && res?.bodyUsed === false) {
        ctx.response.status === 200;
        ctx.response.body = {
            message: "collection_still_preparing",
        };
    }

    const collection = convertCollection()
    await addInitialUserCollection({
      convertedCollection,
      userInfo,
      initializing: true,
    });
}
```

```sql
-- checkForTrackedUser
select count(*) from trackedUsers
where username = username

-- saveUserToTrackedUsers
insert into trackedUsers (id, username, initStatusId)
values (bggUser.userId, username, "initialized")
```

## Get username
## getUserCollection

```sql 
-- Get user 
select * from trackedUsers tu
where tu.username = name
left join initStatusLookup isl
isl.id = tu.initStatusId

-- Get user collection actions
select * from collectionActions ca
left join games g
on g.id = ca.gamesId
left join collectionActionLookup cal
on cal.id = ca.actionId
where ca.userId = user.id
```

```js
// get user collection always returns an object
// if user is not tracked, then all the values are null or false
const user = {
    userId,
    userName,
    isTracked, // initStatus === 'initialized'
    initiationComplete, // initStatus === 'collectionSaved'
    collection: Game[]
}

// FRONTEND
if(!user.isTracked) {
    showStartTrackingForm()
} else if(user.isTracked && !user.initializationComplete) {
    showStillPreparingMessage()
} else if(collection) {
    showCollection()
}
```



