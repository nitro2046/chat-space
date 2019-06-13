json.array! @messages do |message|
  json.body message.body
  json.image message.image
  json.created_at message.created_at.to_s
  json.user_name message.user.name
  json.id message.id
end

if @new_message.present? # @new_messageに中身があれば
  json.array! @new_message # 配列かつjson形式で@new_messageを返す
end
