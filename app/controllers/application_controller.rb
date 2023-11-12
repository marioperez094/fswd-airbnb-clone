class ApplicationController < ActionController::Base

  def current_user
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    session.user
  end
end
