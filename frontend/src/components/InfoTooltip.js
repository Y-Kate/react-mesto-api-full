import React from "react";
import Completed from '../images/completed.svg'
import Error from '../images/erorr_login.svg'

function InfoTooltip({ isSuccess, isOpen, onClose }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}` } onClick={onClose}> 
      <div className= {"popup__container"}>
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form className="form-popup tooltip">
          {isSuccess 
            ? <img className="tooltip__image" alt="Вы успешно зарегестрировались" src={Completed}/>
            : <img className="tooltip__image" alt="Произошла ошибка" src={Error}/>
          }
          <h3 className="tooltip__title">
          {isSuccess 
          ? "Вы успешно зарегестрировались!" 
          : "Что-то пошло не так! Попробуйте еще раз!"}
          </h3>
        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;