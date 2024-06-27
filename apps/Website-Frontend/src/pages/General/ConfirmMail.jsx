import '../../styles/ConfirmMail.css';

function ConfirmMail(){
    return(
        <>
        <div className="parent-mail-cont">
        <div class="email-form-container">
        <form id="emailForm">
            <h2>Submit Your Email</h2>
            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" className='nm' required></input>
            </div>
            <div class="input-group">
                <label for="confirmEmail">Confirm Email:</label>
                <input type="email" id="confirmEmail" className='nm' name="confirmEmail" required></input>
            </div>
            <button type="submit" className='email-submit'>Submit</button>
        </form>
    </div>
        </div>
        </>
    );
}
export default ConfirmMail