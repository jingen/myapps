require 'test_helper'

class PartialControllerTest < ActionController::TestCase
  test "should get partial" do
    get :partial
    assert_response :success
  end

end
