$(function(){

  function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message-box__image">`
        var html = `<div class="message-box">
                      <div class="upper-info">
                        <p class="upper-info__user">
                        ${message.user_name}
                        </p>
                        <p class="upper-info__datatime">
                        ${message.created_at}
                        </p>
                      </div>
                      <p class="message-box__message">
                        ${message.body}
                        ${imagehtml}
                      </p>
                    </div> `
        return html;
      }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href

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
      $('.message-box').append(html);
      $('.form__submit').prop( "disabled", false );     
      $('.message-box').animate({scrollTop: $('.message-box')[0].scrollHeight});
      $('.form__message').val('');
      $('.hidden').val('');
    })

    .fail(function(){
      alert('error');
    })
  });
});
