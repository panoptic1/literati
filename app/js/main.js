function onSignIn(googleUser)
{
    var profile=googleUser.getBasicProfile();
    $(".g-signin2").css("display","none");
    $(".data").css("display","block");
    $("#pic").attr('src',profile.getImageUrl());
    $("#email").text(profile.getEmail());
}

function signOut ()
{
    var auth2 = gap.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        alert("You have been successfully signed out");

        $(".g-signin2").css("display","block");
        $(".data").css("display", "none");
    });
}

/* <script>
gapi.load('auth2',function() {
    gapi.auth2.init();
});


function onSignIn(googleUser) {
// Useful data for your client-side scripts:
var profile = googleUser.getBasicProfile();
console.log("ID: " + profile.getId()); // Don't send this directly to your server!
console.log('Full Name: ' + profile.getName());
console.log('Given Name: ' + profile.getGivenName());
console.log('Family Name: ' + profile.getFamilyName());
console.log("Image URL: " + profile.getImageUrl());
console.log("Email: " + profile.getEmail());

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);
};
</script> */