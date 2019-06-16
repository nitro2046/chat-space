$(function(){
  
  function buildHTML(message){
        var imagehtml = (message.image.url)? `<image class="lower-message_image" src="${message.image.url}">`:"";
        var html = `<div class="message-box"  id='${message.id}'>
                      <div class="upper-info">
                        <p class="upper-info__user">
                          ${message.user_name}
                        </p>
                        <p class="upper-info__datatime">
                          ${message.created_at}
                        </p>
                      </div>
                      <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.body}
                        </p>
                        ${imagehtml}
                      </div>                     
                    </div>`
        return html;
      }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action')

    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.body').append(html);
      $('.form__submit').prop("disabled", false);
      $('.body').animate({scrollTop: $('.body')[0].scrollHeight});
      $('.form__message').val('');
      $('.hidden').val('');
      $('form')[0].reset();
    })

    .fail(function(){
      alert('error');
    })
  });


    function autoUpdate() {
      var url = window.location.href;
      if (url.match(/\/groups\/\d+\/messages/)) {
        var message_id = $('.message-box').last().data('message-id');
          $.ajax({
          url: "api/messages",
          type: 'GET',
          data: { last_id: message_id },
          dataType: 'json'
        })       
        .done(function(messages) {
            messages.forEach(function(message) {
            var html = buildHTML(message);
              $('.body').append(html);
              $('.body').animate({scrollTop: $('.body')[0].scrollHeight }); 
            });
        })       
        .fail(function() {
          alert('自動更新に失敗しました');
        })
      } else {
        clearInterval(autoUpdate);
        }
    };
    setInterval(autoUpdate, 3000);
})
