# 🔗 API Endpoints Guide

Complete reference for all 7 endpoints - how to use them step by step.

---

## 📋 Table of Contents

1. [Create New Chat](#1-create-new-chat-post-chatnew)
2. [Send Message](#2-send-message-post-chat)
3. [Get Chat History](#3-get-chat-history-get-chatchat_id)
4. [List User Chats](#4-list-user-chats-get-useruseridchats)
5. [Get Chat Info](#5-get-chat-info-get-chatchat_idinfo)
6. [Rename Chat](#6-rename-chat-put-chatchat_idrename)
7. [Delete Chat](#7-delete-chat-delete-chatchat_id)

---

## 1️⃣ Create New Chat

### `POST /chat/new`

**Purpose:** Start a new conversation session for a user

---

### How to Use

#### Step 1: Prepare Request
You need to send a **POST request** with JSON data:

```json
{
  "user_id": "student1",
  "chat_name": "Math Homework"
}
```

**Required Fields:**
- `user_id` (string) - Unique user identifier
- `chat_name` (string, optional) - Name for this chat (default: "Untitled Chat")

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl -X POST http://localhost:6969/chat/new \
  -H "Content-Type: application/json" \
  -d '{"user_id":"student1","chat_name":"Math Homework"}'
```

**Using Python:**
```python
import requests

response = requests.post(
    'http://localhost:6969/chat/new',
    json={
        'user_id': 'student1',
        'chat_name': 'Math Homework'
    }
)
chat_data = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat/new', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 'student1',
    chat_name: 'Math Homework'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

---

#### Step 3: Get Response

**Success Response (201):**
```json
{
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "student1",
  "chat_name": "Math Homework"
}
```

**What you get:**
- `chat_id` - **SAVE THIS!** You'll need it for future requests
- `user_id` - The user who owns this chat
- `chat_name` - The name you gave to the chat

**Error Response (400):**
```json
{
  "error": "Missing \"user_id\""
}
```

---

#### Step 4: Save the chat_id

The `chat_id` is crucial for all future operations:

```bash
# Save it in a variable for use in other endpoints
CHAT_ID="550e8400-e29b-41d4-a716-446655440000"
```

---

### Common Use Cases

**Use Case 1: Create chat with custom name**
```bash
curl -X POST http://localhost:6969/chat/new \
  -H "Content-Type: application/json" \
  -d '{"user_id":"alice","chat_name":"Biology Study Session"}'
```

**Use Case 2: Create chat with default name**
```bash
curl -X POST http://localhost:6969/chat/new \
  -H "Content-Type: application/json" \
  -d '{"user_id":"bob"}'
```

**Use Case 3: Multiple chats for same user**
```bash
# Create first chat
CHAT1=$(curl -s -X POST http://localhost:6969/chat/new \
  -H "Content-Type: application/json" \
  -d '{"user_id":"alice","chat_name":"Math"}' | \
  grep -o '"chat_id":"[^"]*"' | cut -d'"' -f4)

# Create second chat for same user
CHAT2=$(curl -s -X POST http://localhost:6969/chat/new \
  -H "Content-Type: application/json" \
  -d '{"user_id":"alice","chat_name":"Science"}' | \
  grep -o '"chat_id":"[^"]*"' | cut -d'"' -f4)

echo "Math chat: $CHAT1"
echo "Science chat: $CHAT2"
```

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 201 | Created successfully | Chat created |
| 400 | Bad request | Missing user_id |
| 500 | Server error | Ollama/Database issue |

---

## 2️⃣ Send Message

### `POST /chat`

**Purpose:** Send a message/question and receive an AI response (auto-saves to database)

---

### How to Use

#### Step 1: Prepare Request

You need:
- `user_id` - The user identifier
- `chat_id` - The chat to send message to (from `/chat/new`)
- `prompt` - The question/message

```json
{
  "user_id": "student1",
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "prompt": "Explain photosynthesis"
}
```

**Required Fields:**
- `user_id` (string) - Must match the chat owner
- `chat_id` (string) - From `/chat/new` response
- `prompt` (string) - Your question or statement

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl -X POST http://localhost:6969/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "student1",
    "chat_id": "550e8400-e29b-41d4-a716-446655440000",
    "prompt": "Explain photosynthesis"
  }'
```

**Using Python:**
```python
import requests

response = requests.post(
    'http://localhost:6969/chat',
    json={
        'user_id': 'student1',
        'chat_id': '550e8400-e29b-41d4-a716-446655440000',
        'prompt': 'Explain photosynthesis'
    }
)
result = response.json()
print(result['response'])
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 'student1',
    chat_id: '550e8400-e29b-41d4-a716-446655440000',
    prompt: 'Explain photosynthesis'
  })
})
.then(res => res.json())
.then(data => console.log('AI says:', data.response))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "user_id": "student1",
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "model": "llama3.2:3b",
  "response": "Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose. It occurs in the chloroplasts of plant cells and involves two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle)..."
}
```

**What you get:**
- `user_id` - The user
- `chat_id` - The chat
- `model` - Model used (always llama3.2:3b)
- `response` - The AI-generated answer

**Important:** The message is automatically saved to the database!

---

#### Step 4: Use the Response

Extract and display the AI response:

```bash
# Just show the response
curl -s -X POST http://localhost:6969/chat \
  -H "Content-Type: application/json" \
  -d '{...}' | \
  python -c "import json, sys; print(json.load(sys.stdin)['response'])"
```

---

### Common Use Cases

**Use Case 1: Ask a simple question**
```bash
curl -X POST http://localhost:6969/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"student1",
    "chat_id":"550e8400-e29b-41d4-a716-446655440000",
    "prompt":"What is photosynthesis?"
  }'
```

**Use Case 2: Ask follow-up question (in same chat)**
```bash
# First question
curl -X POST http://localhost:6969/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"student1",
    "chat_id":"550e8400-e29b-41d4-a716-446655440000",
    "prompt":"What is photosynthesis?"
  }'

# Follow-up (stays in same chat)
curl -X POST http://localhost:6969/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"student1",
    "chat_id":"550e8400-e29b-41d4-a716-446655440000",
    "prompt":"What about cellular respiration?"
  }'
```

**Use Case 3: Multiple questions**
```bash
# Ask several questions in one chat
for question in "What is photosynthesis?" "What is respiration?" "Difference between them?"
do
  curl -X POST http://localhost:6969/chat \
    -H "Content-Type: application/json" \
    -d "{
      \"user_id\":\"student1\",
      \"chat_id\":\"550e8400-e29b-41d4-a716-446655440000\",
      \"prompt\":\"$question\"
    }"
  echo "---"
done
```

---

### Important Notes

1. **Message is auto-saved** - Both user message and AI response saved to database
2. **Model used** - Always llama3.2:3b
3. **System prompt included** - Loaded from prompt.txt automatically
4. **Response time** - Usually 5-30 seconds (model processing)
5. **Permanent storage** - All messages stored forever in chatbot.db

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Message sent & saved |
| 400 | Bad request | Missing required fields |
| 500 | Server error | Ollama down or DB error |

---

## 3️⃣ Get Chat History

### `GET /chat/<chat_id>`

**Purpose:** Retrieve all messages from a specific chat (full conversation history)

---

### How to Use

#### Step 1: Know Your chat_id

Use the `chat_id` from the `/chat/new` response:
```
chat_id = "550e8400-e29b-41d4-a716-446655440000"
```

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000
```

**Using Python:**
```python
import requests

response = requests.get(
    'http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000'
)
history = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000')
  .then(res => res.json())
  .then(data => console.log(data.messages))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "messages": [
    {
      "message_id": 1,
      "role": "user",
      "content": "What is photosynthesis?",
      "model_used": null,
      "created_at": "2024-11-12 10:30:45"
    },
    {
      "message_id": 2,
      "role": "assistant",
      "content": "Photosynthesis is the process by which plants convert light energy...",
      "model_used": "llama3.2:3b",
      "created_at": "2024-11-12 10:30:52"
    },
    {
      "message_id": 3,
      "role": "user",
      "content": "What about cellular respiration?",
      "model_used": null,
      "created_at": "2024-11-12 10:31:00"
    },
    {
      "message_id": 4,
      "role": "assistant",
      "content": "Cellular respiration is the process that releases energy...",
      "model_used": "llama3.2:3b",
      "created_at": "2024-11-12 10:31:08"
    }
  ]
}
```

**What you get:**
- `chat_id` - The chat ID
- `messages` - Array of all messages in conversation order

**For each message:**
- `message_id` - Unique message identifier
- `role` - "user" or "assistant"
- `content` - The message text
- `model_used` - "llama3.2:3b" for assistant, null for user
- `created_at` - Timestamp

---

#### Step 4: Process the Response

**Extract only user messages:**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 | \
  python -c "
import json, sys
data = json.load(sys.stdin)
for msg in data['messages']:
    if msg['role'] == 'user':
        print(f\"User: {msg['content']}\")
  "
```

**Extract only AI responses:**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 | \
  python -c "
import json, sys
data = json.load(sys.stdin)
for msg in data['messages']:
    if msg['role'] == 'assistant':
        print(f\"AI: {msg['content']}\")
  "
```

**Save to file:**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 > chat_history.json
```

---

### Common Use Cases

**Use Case 1: View conversation**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 | python -m json.tool
```

**Use Case 2: Count total messages**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 | \
  python -c "import json, sys; print(len(json.load(sys.stdin)['messages']))"
```

**Use Case 3: Export for study**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000 | \
  python -m json.tool > my_study_notes.json
```

**Use Case 4: Format for display**
```python
import requests
import json

response = requests.get('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000')
data = response.json()

for msg in data['messages']:
    role = msg['role'].upper()
    time = msg['created_at']
    print(f"[{time}] {role}: {msg['content']}\n")
```

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | History returned |
| 404 | Not found | chat_id doesn't exist |
| 500 | Server error | Database issue |

---

## 4️⃣ List User Chats

### `GET /user/<user_id>/chats`

**Purpose:** Get all chat sessions for a specific user

---

### How to Use

#### Step 1: Know Your user_id

Use the user ID you created chats with:
```
user_id = "student1"
```

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl http://localhost:6969/user/student1/chats
```

**Using Python:**
```python
import requests

response = requests.get('http://localhost:6969/user/student1/chats')
chats = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/user/student1/chats')
  .then(res => res.json())
  .then(data => console.log(data.chats))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "user_id": "student1",
  "chats": [
    {
      "chat_id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "student1",
      "chat_name": "Math Homework",
      "created_at": "2024-11-12 10:30:00",
      "updated_at": "2024-11-12 10:35:00"
    },
    {
      "chat_id": "660e8400-e29b-41d4-a716-446655440001",
      "user_id": "student1",
      "chat_name": "Science Study",
      "created_at": "2024-11-12 09:00:00",
      "updated_at": "2024-11-12 09:15:00"
    }
  ]
}
```

**What you get:**
- `user_id` - The user
- `chats` - Array of all their chats (newest first)

**For each chat:**
- `chat_id` - Unique chat identifier
- `user_id` - Chat owner
- `chat_name` - Chat topic
- `created_at` - When chat was created
- `updated_at` - Last activity time

---

#### Step 4: Process the Response

**List all chat names:**
```bash
curl -s http://localhost:6969/user/student1/chats | \
  python -c "
import json, sys
data = json.load(sys.stdin)
for chat in data['chats']:
    print(f\"- {chat['chat_name']} (ID: {chat['chat_id']})\")
  "
```

**Find chat by name:**
```bash
curl -s http://localhost:6969/user/student1/chats | \
  python -c "
import json, sys
search_name = 'Math'
data = json.load(sys.stdin)
for chat in data['chats']:
    if search_name.lower() in chat['chat_name'].lower():
        print(chat['chat_id'])
  "
```

---

### Common Use Cases

**Use Case 1: See all my chats**
```bash
curl http://localhost:6969/user/student1/chats | python -m json.tool
```

**Use Case 2: Count user's chats**
```bash
curl -s http://localhost:6969/user/student1/chats | \
  python -c "import json, sys; print(len(json.load(sys.stdin)['chats']))"
```

**Use Case 3: Find oldest chat**
```bash
curl -s http://localhost:6969/user/student1/chats | \
  python -c "
import json, sys
data = json.load(sys.stdin)
oldest = min(data['chats'], key=lambda x: x['created_at'])
print(f\"Oldest: {oldest['chat_name']} ({oldest['created_at']})\")
  "
```

**Use Case 4: Export all chats**
```bash
curl http://localhost:6969/user/student1/chats > all_my_chats.json
```

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Chats returned (or empty list) |
| 500 | Server error | Database issue |

**Note:** Returns empty list if user has no chats (doesn't return 404)

---

## 5️⃣ Get Chat Info

### `GET /chat/<chat_id>/info`

**Purpose:** Get metadata about a specific chat (name, timestamps, owner)

---

### How to Use

#### Step 1: Know Your chat_id

```
chat_id = "550e8400-e29b-41d4-a716-446655440000"
```

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info
```

**Using Python:**
```python
import requests

response = requests.get('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info')
info = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info')
  .then(res => res.json())
  .then(data => console.log(data))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "student1",
  "chat_name": "Math Homework",
  "created_at": "2024-11-12 10:30:00",
  "updated_at": "2024-11-12 10:35:00"
}
```

**What you get:**
- `chat_id` - Unique identifier
- `user_id` - Chat owner
- `chat_name` - Topic/name
- `created_at` - Creation timestamp
- `updated_at` - Last activity timestamp

**Error Response (404):**
```json
{
  "error": "Chat not found"
}
```

---

#### Step 4: Use the Response

**Display chat info:**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info | \
  python -c "
import json, sys
info = json.load(sys.stdin)
print(f\"Chat: {info['chat_name']}\")
print(f\"Owner: {info['user_id']}\")
print(f\"Created: {info['created_at']}\")
print(f\"Last active: {info['updated_at']}\")
  "
```

---

### Common Use Cases

**Use Case 1: Check chat details**
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info | python -m json.tool
```

**Use Case 2: Get chat owner**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info | \
  python -c "import json, sys; print(json.load(sys.stdin)['user_id'])"
```

**Use Case 3: Check activity time**
```bash
curl -s http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info | \
  python -c "import json, sys; print(json.load(sys.stdin)['updated_at'])"
```

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Chat info returned |
| 404 | Not found | chat_id doesn't exist |
| 500 | Server error | Database issue |

---

## 6️⃣ Rename Chat

### `PUT /chat/<chat_id>/rename`

**Purpose:** Update the name of a chat

---

### How to Use

#### Step 1: Prepare Request

Need:
- `chat_id` - The chat to rename
- `chat_name` - New name

```json
{
  "chat_name": "Updated Math Problems"
}
```

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl -X PUT http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/rename \
  -H "Content-Type: application/json" \
  -d '{"chat_name":"Updated Math Problems"}'
```

**Using Python:**
```python
import requests

response = requests.put(
    'http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/rename',
    json={'chat_name': 'Updated Math Problems'}
)
result = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/rename', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_name: 'Updated Math Problems' })
})
.then(res => res.json())
.then(data => console.log(data))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "chat_id": "550e8400-e29b-41d4-a716-446655440000",
  "chat_name": "Updated Math Problems"
}
```

**What you get:**
- `chat_id` - The chat
- `chat_name` - The new name

**Error Response (400):**
```json
{
  "error": "Missing \"chat_name\""
}
```

---

#### Step 4: Verify

Check that name was updated:
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info
```

---

### Common Use Cases

**Use Case 1: Rename chat**
```bash
curl -X PUT http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/rename \
  -H "Content-Type: application/json" \
  -d '{"chat_name":"Calculus Final Prep"}'
```

**Use Case 2: Add timestamp to name**
```bash
NEW_NAME="Math Homework - $(date +%Y-%m-%d)"
curl -X PUT http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/rename \
  -H "Content-Type: application/json" \
  -d "{\"chat_name\":\"$NEW_NAME\"}"
```

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Chat renamed |
| 400 | Bad request | Missing chat_name |
| 500 | Server error | Database issue |

---

## 7️⃣ Delete Chat

### `DELETE /chat/<chat_id>`

**Purpose:** Delete a chat and all its messages permanently

---

### How to Use

#### Step 1: Know Your chat_id

```
chat_id = "550e8400-e29b-41d4-a716-446655440000"
```

---

#### Step 2: Send Request

**Using cURL:**
```bash
curl -X DELETE http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000
```

**Using Python:**
```python
import requests

response = requests.delete('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000')
result = response.json()
```

**Using JavaScript/Fetch:**
```javascript
fetch('http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data))
```

---

#### Step 3: Get Response

**Success Response (200):**
```json
{
  "message": "Chat deleted successfully"
}
```

**What happens:**
- Chat is removed from database
- All messages in that chat are deleted
- **This is permanent!**

**Error Response (500):**
```json
{
  "error": "Failed to delete chat"
}
```

---

#### Step 4: Verify

Try to get the chat - should return 404:
```bash
curl http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000/info
# Returns: {"error": "Chat not found"}
```

---

### Common Use Cases

**Use Case 1: Delete a chat**
```bash
curl -X DELETE http://localhost:6969/chat/550e8400-e29b-41d4-a716-446655440000
```

**Use Case 2: Delete all user's chats**
```bash
# Get all chats
CHATS=$(curl -s http://localhost:6969/user/student1/chats | \
  python -c "import json, sys; print(' '.join([c['chat_id'] for c in json.load(sys.stdin)['chats']]))")

# Delete each one
for chat_id in $CHATS
do
  curl -X DELETE http://localhost:6969/chat/$chat_id
  echo "Deleted: $chat_id"
done
```

---

### ⚠️ WARNING

**Deletion is permanent!**
- Cannot be undone
- All messages lost forever
- Not recoverable from database

**Before deleting:**
1. Export the chat history: `GET /chat/<id>`
2. Save to file: `curl /chat/<id> > backup.json`
3. Then delete

---

### Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Chat deleted |
| 500 | Server error | Database issue |

---

## 📊 Endpoint Quick Reference

| # | Method | Path | Purpose | Save Data? |
|----|--------|------|---------|-----------|
| 1 | POST | `/chat/new` | Create chat | ✅ (chat) |
| 2 | POST | `/chat` | Send message | ✅ (message) |
| 3 | GET | `/chat/<id>` | View history | ❌ (read only) |
| 4 | GET | `/user/<id>/chats` | List chats | ❌ (read only) |
| 5 | GET | `/chat/<id>/info` | Get details | ❌ (read only) |
| 6 | PUT | `/chat/<id>/rename` | Rename | ✅ (chat name) |
| 7 | DELETE | `/chat/<id>` | Delete | ✅ (removes) |

---

## 🔄 Typical Workflow

```
1. POST /chat/new
   ↓ Get chat_id
   ↓
2. POST /chat (repeat many times)
   ↓ Send messages, get responses
   ↓
3. GET /chat/<id>
   ↓ View all conversation
   ↓
4. GET /user/<id>/chats (optional)
   ↓ See all your chats
   ↓
5. PUT /chat/<id>/rename (optional)
   ↓ Organize chats
   ↓
6. DELETE /chat/<id> (optional)
   ↓ Clean up
```

---

## 💾 Data Storage

| Endpoint | What's Stored | Where | Permanent? |
|----------|---------------|-------|-----------|
| POST /chat/new | Chat metadata | chats table | ✅ Yes |
| POST /chat | User message | messages table | ✅ Yes |
| POST /chat | AI response | messages table | ✅ Yes |
| PUT /chat/.../rename | New name | chats table | ✅ Yes |
| DELETE /chat/<id> | Removed | Database | ✅ Deleted forever |

---

**Start using these endpoints now!** 🚀

See [README.md](README.md) for more advanced usage and examples.
