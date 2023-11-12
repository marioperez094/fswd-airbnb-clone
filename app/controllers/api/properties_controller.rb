module Api
  class PropertiesController < ApplicationController
    def create
      if !current_user
        return render json: { error: 'user not logged in' }, status: :unauthorized if !session
      end

      user = current_user
      return render json: { error: 'cannot find user' }, status: :not_found if !user
      
      begin
        @property = user.properties.create!(property_params)
        render 'api/properties/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def index_by_user
      user = User.find_by(username: params[:username])
      return render json: { error: 'cannot find user' }, status: :not_found if !user

      @properties = user.properties.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties
      render 'api/properties/index'
    end

    def show
      find_property

      render 'api/properties/show', status: :ok
    end

    def update
      find_property

      begin 
        @property.update(property_params)
        render 'api/properties/create', status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def find_property
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property
    end

    def destroy
      if !current_user
        return render json: { success: false } unless current_user
      end

      user = current_user
      property = Property.find_by(id: params[:id])

      if property && (property.user == user) && property.destroy
        render json: {
          success: true
        }
      else 
        render json: {
          success: false
        }
      end
    end

    private

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :user_id, images: [])
    end
  end
end