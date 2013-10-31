class ImagesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  # deal with the image resizing request and send back the results
  def create 
    @image ||= Image.new(image_params)
    @image.remote_image_url = params[:remote_image_url] unless params[:remote_image_url].nil?
    if @image.save
      render json: {"url" => @image.image_url(:resized), "success" => true}
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  private

  # construct image arguments
  def image_params
    {
      width: params[:width],
      height: params[:height],
      scale: params[:scale],
      resize_method: params[:resize_method],
      image: params[:file]
    }
  end

end
