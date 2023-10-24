class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def user
    @data = { username: params[:username] }.to_json
    render 'user'
  end

  def login
    render 'login'
  end

  def success
    @data = { booking_id: params[:id]}.to_json
    render 'success'
  end

  def myProperties
    render 'my_properties'
  end
end