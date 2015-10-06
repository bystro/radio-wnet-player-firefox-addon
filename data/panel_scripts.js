            function playOnlineStream() {
                //$("#player").html('<object data="http://audio.radiownet.pl:8000/stream" style="width:100%; height:40px;"></object>');

                audioInterfaceState();

                $("#online_stream_player_container").html('<audio id="online" class="audio" controls autoplay preload="none"><source id="wnetPlayer_src" src="http://audio.radiownet.pl:8000/stream">Twoja przeglądarka nie obsługuje strumienia. Zaktualizuj przeglądarkę do nowszej wersji.</audio>');
                $("#online_stream_player_container").show();

            }


            function playOnlinePodcast(activeItem) {
                //$("#player").html('<object data="'+url+'" style="width:100%; height:40px;"></object>');

                audioInterfaceState();

                var id = activeItem.attr('podcast-id');
                $("#podcast_player_container"+id).html('<audio id="audio_podcast'+id+'" class="audio" controls autoplay preload="none"><source id="wnetPlayer_src" src="'+$('#podcast'+id+' .el-data').attr('podcast-url')+'">Twoja przeglądarka nie obsługuje strumienia. Zaktualizuj przeglądarkę do nowszej wersji.</audio>');
                $("#podcast_player_container"+id).show();

            }

            function audioInterfaceState() {

                $( ".audio_container" ).each(function( index ) {
                    $( this ).html('');
                    $( this ).hide();
                });

            }

            function playInterfaceState(activeItem) {
                var strItemDefaultBackgroundImage1 = 'url("el-bg.jpg")';
                var strItemDefaultBackgroundImage2 = 'url("play.png")';


                $( ".el-bt-bg" ).each(function( index ) {
                    $( this ).css('background-image', strItemDefaultBackgroundImage1);

                    $( this ).children('.el-bt').css('background-image', strItemDefaultBackgroundImage2);

                });                

                activeItem.css('background-image', 'url("el-first-bg.jpg")');
                activeItem.children('.el-bt').css('background-image', 'url("play_down.png")');
                //alert(activeItem);

            }