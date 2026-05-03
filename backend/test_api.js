async function run() {
  try {
    const loginRes = await fetch('https://campus-connect-backend.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'shailendra.shrivastava.cd24@ggits.net',
        password: 'password123'
      })
    });
    const loginText = await loginRes.text();
    if (!loginRes.ok) throw new Error('Login failed: ' + loginText);
    const loginData = JSON.parse(loginText);
    const token = loginData.access_token;
    const userId = loginData.user.id;
    console.log('Logged in. User ID:', userId);

    const connRes = await fetch('https://campus-connect-backend.onrender.com/connections', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const connText = await connRes.text();
    if (!connRes.ok) throw new Error('Connections failed: ' + connText);
    const connections = JSON.parse(connText);
    console.log('Connections:', connections);

    if (connections.length > 0) {
       const partnerId = connections[0].senderId === userId ? connections[0].receiverId : connections[0].senderId;
       console.log('Fetching messages for partner:', partnerId);

       const msgRes = await fetch(`https://campus-connect-backend.onrender.com/messages/${partnerId}`, {
         headers: { Authorization: `Bearer ${token}` }
       });
       const msgText = await msgRes.text();
       console.log('Messages Response:', msgRes.status, msgText);
    }
  } catch (err) {
    console.error(err);
  }
}
run();
