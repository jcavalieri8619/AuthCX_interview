using System.Collections.Generic;
using System.Linq;
using AuthCX.Models;
using AuthCX.Repositories.Message;
using AuthCX.TextProcessing;


namespace AuthCX.Services.Message
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IStopwordRemovalService _stopwordRemovalService;

        public MessageService(IMessageRepo messageRepo, IStopwordRemovalService stopwordRemovalService)
        {
            _messageRepo = messageRepo;
            _stopwordRemovalService = stopwordRemovalService;
        }

        public IEnumerable<MessageData> GetMessages()
        {
            return _messageRepo.GetMessages().Select(data => new MessageData
                {Id = data.Id, Text = data.Text, NoStopText = _stopwordRemovalService.RemoveStopwords(data.Text)});
        }

        public IEnumerable<MessageData> GetMessages(string userId)
        {
            return GetMessages().Where(data => data.Id == userId);
        }


        public IEnumerable<MessageData> FilterStopWords()
        {
            return GetMessages().Select(data => new MessageData
                {Id = data.Id, Text = _stopwordRemovalService.RemoveStopwords(data.Text)});
        }

        public IEnumerable<MessageData> FilterStopWords(string userId)
        {
            return GetMessages(userId).Select(data => new MessageData
                {Id = data.Id, Text = _stopwordRemovalService.RemoveStopwords(data.Text)});
        }

        public long CountMessages()
        {
            return GetMessages().Count();
        }

        public long CountMessages(string userId)
        {
            return GetMessages(userId).Count();
        }

        public long CountWordPhrase(string wordPhrase)
        {
            return GetMessages().Count(data => data.Text.Contains(wordPhrase));
        }

        public long CountWordPhrase(string userId, string wordPhrase)
        {
            return GetMessages(userId).Count(data => data.Text.Contains(wordPhrase));
        }

        public IEnumerable<MessageData> MessagesWithWordPhrase(string wordPhrase)
        {
            return GetMessages().Where(data => data.Text.Contains(wordPhrase));
        }

        public IEnumerable<MessageData> MessagesWithWordPhrase(string userId, string wordPhrase)
        {
            return GetMessages(userId).Where(data => data.Text.Contains(wordPhrase));
        }
    }
}