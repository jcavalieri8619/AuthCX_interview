using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthCX.Models;
using AuthCX.Services.Message;
using AuthCX.Services.User;
using AuthCX.Services.UserMessage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AuthCX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageInfoController : ControllerBase
    {
        private readonly IUserMessageService _userMessageService;
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;
        private readonly ILogger<MessageInfoController> _logger;

        public MessageInfoController(IUserMessageService userMessageService, IUserService userService,
            IMessageService messageService, ILogger<MessageInfoController> logger)
        {
            _userMessageService = userMessageService;
            _userService = userService;
            _messageService = messageService;
            _logger = logger;
        }

        // GET: api/MessageInfo/GetUserMessages?userId=id
        [HttpGet("GetUserMessages")]
        public IEnumerable<UserMessage> GetUserMessages(string userId)
        {
            return string.IsNullOrEmpty(userId?.Trim())
                ? _userMessageService.GetUserMessages()
                : _userMessageService.GetUserMessages(userId);
        }

        // GET: api/MessageInfo/GetMessages?userId=id
        [HttpGet("GetMessages")]
        public IEnumerable<MessageData> GetMessages(string userId)
        {
            return string.IsNullOrEmpty(userId?.Trim())
                ? _messageService.GetMessages()
                : _messageService.GetMessages(userId);
        }

        // GET: api/MessageInfo/GetMessages?userId=id
        [HttpGet("GetUsers")]
        public IEnumerable<UserInfo> GetUsers(string userId)
        {
            return string.IsNullOrEmpty(userId?.Trim())
                ? _userService.GetUserRecords()
                : _userService.GetUserRecords(userId);
        }

        // GET: api/MessageInfo/AggregateEmailDomain?domain=domain
        [HttpGet("AggregateEmailDomain")]
        public IEnumerable<MessagesByKey> AggregateEmailDomain(string domain)
        {
            return string.IsNullOrEmpty(domain?.Trim())
                ? _userMessageService.AggregateEmailDomain()
                : _userMessageService.AggregateEmailDomain(domain);
        }

        // GET: api/MessageInfo/AggregateUserId?userId=id
        [HttpGet("AggregateUserId")]
        public IEnumerable<MessagesByKey> AggregateUserId(string userId)
        {
            return string.IsNullOrEmpty(userId?.Trim())
                ? _userMessageService.AggregateUserId()
                : _userMessageService.AggregateUserId(userId);
        }

        // GET: api/MessageInfo/CountMessages?userId=id
        [HttpGet("CountMessages")]
        public long CountMessages(string userId)
        {
            return string.IsNullOrEmpty(userId?.Trim())
                ? _messageService.CountMessages()
                : _messageService.CountMessages(userId);
        }

        // GET: api/MessageInfo/CountWordPhrase?userId=id,phrase=txt
        [HttpGet("CountWordPhrase")]
        public long CountWordPhrase(string userId, string phrase)
        {
            if (string.IsNullOrEmpty(phrase?.Trim()))
            {
                return 0;
            }

            return string.IsNullOrEmpty(userId?.Trim())
                ? _messageService.CountWordPhrase(phrase)
                : _messageService.CountWordPhrase(userId, phrase);
        }

        // GET: api/MessageInfo/MessagesWithWordPhrase?userId=id,phrase=txt
        [HttpGet("MessagesWithWordPhrase")]
        public IEnumerable<MessageData> MessagesWithWordPhrase(string userId, string phrase)
        {
            if (string.IsNullOrEmpty(phrase?.Trim()))
            {
                return Enumerable.Empty<MessageData>();
            }

            return string.IsNullOrEmpty(userId?.Trim())
                ? _messageService.MessagesWithWordPhrase(phrase)
                : _messageService.MessagesWithWordPhrase(userId, phrase);
        }
    }
}