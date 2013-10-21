class PartialController < ApplicationController
  def partial
    if [
         "image_resize",
         "image_result",
         "spell_check",
       ].include?(params[:partial])
      render params[:partial], :layout => false
    end
  end
end
