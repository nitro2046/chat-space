$(function(){

  function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message-box__image">`
        var html = `<div class="message-box">
                      <div class="upper-info"  id='${message.id}'>
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
      $('form')[0].reset();
    })

    .fail(function(){
      alert('error');
    })
  });

  $(function(){
  
    $(function(){
      setInterval(update, 10000);
      //10000ミリ秒ごとにupdateという関数を実行する
    });
    function update(){ //この関数では以下のことを行う
      if($('.upper-info')[0]){ //もし'messages'というクラスがあったら
        var message_id = $('.upper-info:last').data('id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
      } else { //ない場合は
        var message_id = 0 //0を代入
      }
      $.ajax({ //ajax通信で以下のことを行う
        url: location.href, //urlは現在のページを指定
        type: 'GET', //メソッドを指定
        data: { //railsに引き渡すデータは
          message: { id: message_id } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
        },
        dataType: 'json' //データはjson形式
      })
      .always(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
        $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
          buildHTML(data); //buildHTMLを呼び出す
        });
      });
    }
  });
  
});
