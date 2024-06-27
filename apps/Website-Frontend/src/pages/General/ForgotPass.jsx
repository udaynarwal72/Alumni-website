import '../../styles/SignIn.css';
import '../../styles/ForgotPass.css';

function ForgotPass(){
    return(
        <>
             <div className="parent-login">
                <div className="parent-login-container">
                    <div className="left-panel">
                        <div className="card-image-container">
                            <img src="https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour-120x93.png"></img>
                        </div>
                        <div className="verification">
                            <h2>Be Verified</h2>
                            
                        </div>
                    </div>
                    <div className="right-panel">
                        <h2>Reset Password</h2>
                        <p>We are happy to have you back</p>
                        <form class="login-form">
                            <label>Enter new Password:</label>
                            <input type="text"   required />
                            <label>Confirm Password:</label>
                            <input type="password" id="password"  placeholder='password' name="password" required />
                            
                            <button type="submit"  class='forget-b'>Reset</button>
                        </form>
                        
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ForgotPass;