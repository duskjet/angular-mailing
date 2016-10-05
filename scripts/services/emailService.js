(function () {
    'use strict';

    angular
        .module('app')
        .factory('emailService', emailService);

    emailService.$inject = ['$http'];

    function emailService($http) {
        var service = {
            send: send
        };

        return service;

        function send(form, token, callback) {
            // split "To" emails and write to array
            var recipients = splitRecipients(form.to);//['zhopa@gmail.com', 'govno@gmail.com']; // splitRecipients(form.to);
            // for each element in array, create new proper object and form an array to send
            var messages = [];
            for (var i = 0; i < recipients.length; i++) {
                var mail = {
                    from: form.from,
                    to: recipients[i],
                    subject: form.subject,
                    message: form.message
                }
                messages.push(mail);
            }
            return $http({
                url: "https://httpbin.org/post",
                dataType: 'json',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                data: messages
            }).success(function (response) {
                console.log('OK GetContractByParams POST', response);
                callback(response);
            }).error(function (error) {
                console.log('GetContractByParams error POST', error);
            });
        }

        function splitRecipients(text) {
            var splittedArray = [];
            var match, regex = /([^\s,].+?)(?:,|\s|$)/g;
            
            while (match = regex.exec(text)) {
                splittedArray.push(match[1]);
            }
            return splittedArray;
        }
    };
})();