const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;


/* Assuming you have a login route that sets the logged_in property in the session
app.post('/login', async (req, res) => {
  try {
    // Perform user authentication, e.g., check username and password
    // If authentication is successful, set the logged_in property in the session
    if (authenticatedSuccessfully) {
      req.session.logged_in = true;
      // You might also set other properties like user_id, username, etc.
      req.session.user_id = authenticatedUserId;
      req.session.username = authenticatedUsername;
      // Redirect the user to a protected route
      res.redirect('/protected-route');
    } else {
      // Authentication failed, show an error message
      res.render('login', { error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

*/

