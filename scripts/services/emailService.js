(function () {
    'use strict';

    angular
        .module('app')
        .factory('emailService', emailService);

    emailService.$inject = ['$http', 'API', 'Notification'];

    function emailService($http, api, notification) {
        var emailRegex = /\S+@\S+\.\S+/;

        var service = {
            send: send,
            history: history,
            split: splitRecipients,
            validate: validateEmail
        };

        return service;

        function send(form, token, callback) {
            // split "To" emails and write to array
            var recipients = splitRecipients(form.to);
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
                url: api.base + api.email,
                dataType: 'json',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                data: messages
            }).success(function (response) {
                console.log('OK GetContractByParams POST', response);
                callback(response);
            }).error(function (error) {
                console.error('http error: ', error);
            });
        }

        function history(token, callback){
            return $http({
                url: api.base + api.email,
                dataType: 'json',
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            }).success(function (response) {
                callback(response);
            }).error(function (error) {
                console.error('http error: ', error);
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

        function validateEmail(email) {
            return emailRegex.test(email);
        }
    };
})();