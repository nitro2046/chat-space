class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = Message.all
    respond_to do |format|
      format.html
      format.json{ @new_messages = @messages.where('id > ?', params[:id]) }
    end
  end

end
