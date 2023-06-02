/*@include ./includes/ext.js */

// globalShopJs set by including JS
if (!globalShopJs){
    console.log("globalShopJs not set");
}

var shop_code = globalShopJs.shop_code;
var product_id = globalShopJs.product_id;
var mount_point = globalShopJs.mount_id;
//var apiUrl = 'https://widgetservice/'+shop_code+'/'+product_id;

let productFormTemplate =
'<div class="product-header card-header d-flex">' +
    '<form>'+
        '{{#items}}' +
            '{{#dropdown}}' +
                '<div class="form-group">' +
                    '<label for="">{{name}}</label>'+
                    '<select class="form-control" {{#mandatory}}required="true"{{/mandatory}}>' +
                        '{{#values}}' +
                            '<option>{{.}}</option>' +
                        '{{/values}}' + 
                    '</select>' +
                '</div>' +    
            '{{/dropdown}}' +
            '{{#checkbox}}' +
                '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" {{#mandatory}}required="true"{{/mandatory}}>' +
                    '<label for="">{{name}}</label>'+
                '</div>' +        
            '{{/checkbox}}' +
            '{{#textarea}}' +
                '<div class="form-group">' +
                    '<label for="">{{name}}</label>'+
                    '<textarea class="form-control" type="textarea" {{#mandatory}}required="true"{{/mandatory}}></textarea>' +
                '</div>' +        
            '{{/textarea}}' +
        '{{/items}}' +
    '</form>'+
'</div>';

function fetchProduct(product_id, callback){
    /*
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
    }).done(function(response){
        callback && callback(response);
    }).fail(function(){
    }).always(function(){
    });
    */

    //instead of calling a service we return a hardcoded json for now
    let product_forms = {
        'product-1': {
            items: [
                {
                    name: 'Which destination would you like to visit ?',
                    dropdown: 'true',
                    values: ['Please select', 'Spain', 'Portugal', 'Greece'],
                    mandatory: 'true'
                },
                {
                    name: 'Is this your first vacation this year ?',
                    checkbox: 'true',
                    
                    mandatory: ''
                },
                {
                    name: 'Any other comments you would like to add?',
                    textarea: 'true',
                    maxlength: '4000',
                    mandatory: ''
                },
            ]
        },
        'product-2': {
            items: [
                {
                    name: 'Would you like to be added to our newsletter ?',
                    checkbox: 'true',
                    mandatory: ''
                },
                {
                    name: 'Please select your main reason for going away',
                    dropdown: 'true',
                    values: ['Please select', 'Leisure', 'Work', 'Both'],
                    mandatory: 'true'
                },
                {
                    name: 'Other comments',
                    textarea: 'true',
                    maxlength: '4000',
                    mandatory: ''
                },
            ]
        },            

    }

    callback(product_forms[product_id]);

}

function renderProductForm(response){
    
    if (!response || !response.items){
        return;
    }
    
    //$('.js-header-div').html("This form comes from remote server");
    $(mount_point).html(Mustache.render(productFormTemplate, {items: response.items}));
    
}

fetchProduct(product_id, function(response){
    renderProductForm(response);
    // do next....
    
});


