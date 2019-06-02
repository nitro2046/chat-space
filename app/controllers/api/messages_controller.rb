class Api::MessagesController < ApplicationController
  before_action :set_group
  
  def index
    def index
      @message = Message.new
      @messages = @group.messages.includes(:user)
      respond_to do |format| 
        format.html 
        format.json { @new_message = @messages.where('id > ?', params[:message][:id]) } # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
      end
    end
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

end
