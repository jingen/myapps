class PartialController < ApplicationController
  def partial
    if [
         "image_resize",
         "spell_check",
       ].include?(params[:partial])
      render params[:partial], :layout => false
    end
  end
end
