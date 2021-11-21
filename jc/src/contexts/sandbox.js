const onSubmit = evt => {
  evt.preventDefault();
  props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
  .then(authUser => {
    // Create a user profile
    return props.firebase.user(authUser.user.uid).set(
      {
        username:username
        email,
      },
      { merge: true },
    );
  })
  .then(() => {
    ///do something like send to a new route
  }) .catch(error => {
    ///catch errors
  });
}



fbApp.firestore().collection('users').doc(ref.user.uid).set({
  name: ref.user.bc.displayName,
  email: ref.user.bc.email,
  orders: 0,
  created: false,
})
