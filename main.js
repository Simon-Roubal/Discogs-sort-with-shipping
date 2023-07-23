
const site = window.hostname;
const path = window.pathname;

const search = window.location.search;
const urlParams = new URLSearchParams(search);
const sort = urlParams.get('sort');

$(document).ready(function(){

	append_options();
    select_option();
	
    if(sort == "price+shipping,asc" || sort == "price+shipping,desc")
    {
        sort_with_shipping();
    }
	
});

function append_options()
{
    $('#sort_top, #sort_bottom').append($('<option>', {
         value: "price+shipping,asc",
         text: 'Price + Shipping Lowest'
    }));


    $('#sort_top, #sort_bottom').append($('<option>', {
        value: "price+shipping,desc",
        text: 'Price + Shipping Highest'
    }));
}

function select_option()
{
	if(sort == "price+shipping,asc")
    {
        $('#sort_top option[value="price+shipping,asc"], #sort_bottom option[value="price+shipping,asc"]').prop('selected', true)
    }
	else if(sort == "price+shipping,desc")
	{
      $('#sort_top option[value="price+shipping,desc"], #sort_bottom option[value="price+shipping,desc"]').prop('selected', true)
    }
}



function sort_with_shipping()
{
    $(".muted").parent().each(function(){
        $(this).hide();
    });
    var count = 0;
    $("tr.shortcut_navigable:visible").each(function(){
        $(this).attr("id", "sort_"+count);
        $(this).addClass("unsorted_tr");
        count++;
    });
    var price_arr = [];
    $("tr.shortcut_navigable:visible").each(function(){
        let price = $(this).find(".converted_price").text();
        price = price.substring(price.search("€") + 1, price.search("€") + 6);
        let id = $(this).attr("id");
        price_arr.push({tr_id: id, tr_price: price});
    }); 
    if(sort == "price+shipping,asc")
    {
        price_arr = price_arr.sort((min, max) => min.tr_price - max.tr_price); 
    }
    else
    {
        price_arr = price_arr.sort((min, max) => max.tr_price - min.tr_price); 
    }
    

    count = 0;
    $.each(price_arr, function () {
        $("#"+price_arr[count].tr_id).appendTo("tbody").closest();
        count++;
    }); 

    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, 0);
}