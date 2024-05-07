// we have to run this function for every request for that we will be using nextJs
export const authConfig = {
    providers:[],
    pages:{
        signIn:"/login"
        // if we are not authenticated we will be redirected to this page and if we are logged we don't want to see that page
    },
    callbacks:{
        authorized({auth,request}){
            const isLoggedIn = auth?.user
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
            if(isOnDashboard){
                if(isLoggedIn) return true
                return false
            }else if(isLoggedIn){
                return Response.redirect(new URL("/dashboard",request.nextUrl))
            }
            return true;
        }
    }
}