# 📘 Technical Design Document – *Feature Name*

## 1. Overview
A short summary of the feature, the problem it solves, and the expected outcome.

---

## 2. Goals

- Create an API which shows the top 10 user’s scores
- Secure flow to prevent malicious users from increasing scores without authorisation
- Ready to expand to milions requests when system expand and number of user increase fast

---

## 3. Architecture Overview
High-level description of the system and data flow.
### Database Diagram
```mermaid
erDiagram

    USERS {
        int id PK
        varchar username
        varchar email
    }

    GAMES {
        int id PK
        varchar name
        int score
    }

    LEADERBOARD {
        int id PK
        int user_id
        int score
    }

    GAME_SESSIONS {
        int id PK
        int user_id
        int game_id
        int leaderboard_id
        enum status
    }

    %% Relationships
    USERS ||--o{ LEADERBOARD : "has entries in"
    USERS ||--o{ GAME_SESSIONS : "triggers"
    GAMES ||--o{ GAME_SESSIONS : "is referenced by"
    LEADERBOARD ||--o{ GAME_SESSIONS : "linked via"
```
### User Flow Diagram
```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant C as Client App
    participant SS as Scoring Service
    participant DB as Database
    participant RL as Redis Leaderboard

    %% Step 1 – User starts game
    U ->> C: Start Game
    C ->> SS: startGameSession()

    SS ->> DB: findUserById(user_id)
    DB -->> SS: user record

    SS ->> DB: createGameSessionRecord(status="playing")
    DB -->> SS: game_session record created

    SS -->> C: session initialized (status=playing)

    %% Step 2 – Gameplay token submitted
    U ->> C: Complete gameplay segment<br/>Client prepares metadata token
    C ->> SS: submitGameToken(token_metadata)

    SS ->> SS: validate & parse token metadata
    SS ->> SS: calculateScoreDelta()

    SS ->> DB: updateUserScore(delta)
    DB -->> SS: score updated

    SS ->> RL: update leaderboard in cache
    RL -->> SS: leaderboard updated

    SS -->> C: return new score
    C ->> U: Show updated score
```

### APIs
#### POST /game/start
Request
```
{
    game_id
}
```

#### POST /game/end
Request
```
{
    game_id
}
```
#### Websocket /leaderboard
Request
```
```
Response
```
{
  "leaderboard": [
    { "user_id": 1, "score": 2000 },
    { "user_id": 7, "score": 1920 }
  ]
}

```

## 4. My Oppinion
The solution I suggest above can prevent:
- User start many game at a time (through Scoring Service)
- Always can recaculate for user if fraud detected
- seperate leaboard data to read from cache to avoid hitting DB too much

P/s: Above is my thought when I reading on the problem. Would be beter to here your thought for fraud prevented in your bussiness