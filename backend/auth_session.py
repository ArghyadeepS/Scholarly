import uuid, time
from database import get_db

SESSION_DURATION = 7 * 24 * 60 * 60  

def create_session(user_id):
    session_id = str(uuid.uuid4())
    expires_at = int(time.time()) + SESSION_DURATION

    conn = get_db()
    conn.execute(
        "INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)",
        (session_id, user_id, expires_at),
    )
    conn.commit()
    conn.close()

    return session_id


def get_user_from_session(session_id):
    conn = get_db()
    cursor = conn.execute(
        """
        SELECT users.*, sessions.expires_at 
        FROM sessions 
        JOIN users ON users.id = sessions.user_id
        WHERE session_id=?
        """,
        (session_id,)
    )
    user = cursor.fetchone()
    conn.close()

    if not user:
        return None
    if user["expires_at"] < int(time.time()):
        delete_session(session_id)
        return None

    return dict(user)


def delete_session(session_id):
    conn = get_db()
    conn.execute("DELETE FROM sessions WHERE session_id=?", (session_id,))
    conn.commit()
    conn.close()
