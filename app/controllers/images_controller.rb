class ImagesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  # deal with the image resizing request and send back the results
  def generate
    image = Image.new(image_params)
    image.remote_image_url = params[:remote_image_url] if !params[:remote_image_url].nil?
    if image.save
      render json: {"url" => image.image_url(:resized), "success" => true}
    else
      render json: {"url" => image.image_url, "success" => false}
    end
  end

  private

  # filter users' arguments
  def image_params
    params.require(:image).permit(:width, :height, :scale, :resize_method)
  end

end
