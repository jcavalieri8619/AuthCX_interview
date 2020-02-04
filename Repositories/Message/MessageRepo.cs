using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using AuthCX.Models;
using AuthCX.TextProcessing;
using Microsoft.Extensions.Logging;

namespace AuthCX.Repositories.Message
{
    public class MessageRepo : IMessageRepo
    {
        private readonly ILogger<MessageRepo> _logger;

        private readonly Regex _messageRegex = new Regex(@"^(?<id>\d+)\s+(?<msg>[A-Za-z,;' 0-9]+[.?!]*)",
            RegexOptions.Compiled |
            RegexOptions.IgnoreCase |
            RegexOptions.ExplicitCapture |
            RegexOptions.Multiline);

        readonly List<MessageData> _messages = new List<MessageData>();

        public MessageRepo(ILogger<MessageRepo> logger)
        {
            _logger = logger;

            using var reader =
                new StreamReader(Path.Combine(Directory.GetCurrentDirectory(), "SampleData", "userMessageBatch.txt"));


            var matches = _messageRegex.Matches(reader.ReadToEnd());


            foreach (Match match in matches)
            {
                var groups = match.Groups;

                var messageData = new MessageData
                {
                    Id = groups["id"].ToString(), Text = groups["msg"].ToString()
                };
                _messages.Add(messageData);
            }
        }

        public IEnumerable<MessageData> GetMessages()
        {
            return _messages;
        }
    }
}