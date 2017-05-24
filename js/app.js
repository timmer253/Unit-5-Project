"use strict";

$('form').submit(function (e) {
    e.preventDefault();

    //Declarations
    let $searchBar = $('#search');
    let $submitButton = $('#submit');
    let spotifyCall = "https://api.spotify.com/v1/search";
    let searchInput = $searchBar.val();
    let inputData = {q: searchInput, type: "album"};
    let displayAlbumHTML = '';

    //Set Default Values for Search Utility
    $searchBar.prop("disabled", true);
    $submitButton.attr("disabled", true).val('Searching..');

    function displayAlbum(spotifyResponse) {
        $('.desc').remove();

        $.each(spotifyResponse.albums.items, function (i,album) {
            //Placed into an li, displaying album title and art image using exact css names..
            displayAlbumHTML += `
            <li>
              <a href="${album.external_urls.spotify}" target="_blank" id=${i}>

                    <div class="album-wrap">
                         <img class="album-art" src="${album.images[0].url}">
                    </div>

                <span class="album-title">${album.name}</span>
                <span class="album-artist">${album.artists[0].name}</span>
              </a>
            </li>
    			                `;
        });

        $searchBar.prop("disabled", false);
        $submitButton.attr("disabled", false);

        // No results found functionality
        if(displayAlbumHTML === '') {
            displayAlbumHTML = `
        <li class='no-albums'>
                //"No albums found that match"
            <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${searchInput}
        </li>
                               `
        }
        $('#albums').html(displayAlbumHTML);
    }
    //Formatted request
    $.getJSON(spotifyCall,inputData,displayAlbum);
});