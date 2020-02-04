using System;
using System.Collections.Generic;
using System.Linq;
using AuthCX.Models;
using AuthCX.Services.Message;
using AuthCX.Services.User;
using Microsoft.Extensions.Logging;

namespace AuthCX.Services.UserMessage
{
    public class UserMessageService : IUserMessageService
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;
        private readonly ILogger<UserMessageService> _logger;

        public UserMessageService(IMessageService messageService, IUserService userService,
            ILogger<UserMessageService> logger)
        {
            _messageService = messageService;
            _userService = userService;
            _logger = logger;
        }


        public IEnumerable<Models.UserMessage> GetUserMessages()
        {
            return _userService.GetUserRecords()
                .Join(_messageService.GetMessages(),
                    outerKeySelector: info => info.Id,
                    innerKeySelector: data => data.Id,
                    resultSelector: (info, data) => new Models.UserMessage
                    {
                        Email = info?.Email, Id = info?.Id, Text = data?.Text, FirstName = info?.FirstName,
                        LastName = info?.LastName, PhoneNumber = info?.PhoneNumber, UserName = info?.UserName,
                        NoStopText = data?.NoStopText
                    });
        }

        public IEnumerable<Models.UserMessage> GetUserMessages(string userId)
        {
            return GetUserMessages()
                .Where(predicate: message => message.Id == userId);
        }

        public IEnumerable<MessagesByKey> AggregateEmailDomain()
        {
            var res = _userService.GetUserRecords()
                .Join(_messageService.GetMessages(),
                    outerKeySelector: info => info.Id,
                    innerKeySelector: data => data.Id,
                    resultSelector: (info, data) => new Models.UserMessage
                    {
                        Email = info.Email, Id = info.Id, Text = data.Text, FirstName = info.FirstName,
                        LastName = info.LastName, PhoneNumber = info.PhoneNumber, UserName = info.UserName,
                        NoStopText = data?.NoStopText
                    })
                .Where(predicate: message => message.Email.Contains('@'))
                .GroupBy(keySelector: message => message.Email.Split('@')[1],
                    resultSelector: (key, lst) => new MessagesByKey() {Key = key, Messages = lst});


            return res;
        }

        public IEnumerable<MessagesByKey> AggregateEmailDomain(string domain)
        {
            var res = _userService.GetUserRecords()
                .Join(_messageService.GetMessages(),
                    outerKeySelector: info => info.Id,
                    innerKeySelector: data => data.Id,
                    resultSelector: (info, data) => new Models.UserMessage
                    {
                        Email = info.Email, Id = info.Id, Text = data.Text, FirstName = info.FirstName,
                        LastName = info.LastName, PhoneNumber = info.PhoneNumber, UserName = info.UserName,
                        NoStopText = data.NoStopText
                    })
                .Where(predicate: message => message.Email.Contains('@'))
                .Where(predicate: message =>
                    message.Email.Split('@')[1].Equals(domain, StringComparison.InvariantCultureIgnoreCase))
                .GroupBy(keySelector: message => message.Email.Split('@')[1],
                    resultSelector: (key, lst) => new MessagesByKey() {Key = key, Messages = lst});

            return res;
        }

        public IEnumerable<MessagesByKey> AggregateUserId()
        {
            var res = _userService.GetUserRecords()
                .Join(_messageService.GetMessages(),
                    outerKeySelector: info => info.Id,
                    innerKeySelector: data => data.Id,
                    resultSelector: (info, data) => new Models.UserMessage
                    {
                        Email = info.Email, Id = info.Id, Text = data.Text, FirstName = info.FirstName,
                        LastName = info.LastName, PhoneNumber = info.PhoneNumber, UserName = info.UserName,
                        NoStopText = data.NoStopText
                    }).GroupBy(keySelector: message => message.Id,
                    resultSelector: (key, lst) => new MessagesByKey {Key = key, Messages = lst});
            return res;
        }

        public IEnumerable<MessagesByKey> AggregateUserId(string userId)
        {
            var res = _userService.GetUserRecords()
                .Join(_messageService.GetMessages(),
                    outerKeySelector: info => info.Id,
                    innerKeySelector: data => data.Id,
                    resultSelector: (info, data) => new Models.UserMessage
                    {
                        Email = info.Email, Id = info.Id, Text = data.Text, FirstName = info.FirstName,
                        LastName = info.LastName, PhoneNumber = info.PhoneNumber, UserName = info.UserName,
                        NoStopText = data?.NoStopText
                    })
                .Where(predicate: message => message.Id.Equals(userId, StringComparison.Ordinal))
                .GroupBy(keySelector: message => message.Id,
                    resultSelector: (key, lst) => new MessagesByKey {Key = key, Messages = lst});
            return res;
        }
    }
}