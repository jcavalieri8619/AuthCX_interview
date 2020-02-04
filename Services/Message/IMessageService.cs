using System.Collections.Generic;
using AuthCX.Models;

namespace AuthCX.Services.Message
{
    public interface IMessageService
    {
        IEnumerable<MessageData> GetMessages();
        IEnumerable<MessageData> GetMessages(string userId);

        IEnumerable<MessageData> FilterStopWords();
        IEnumerable<MessageData> FilterStopWords(string userId);
        long CountMessages();
        long CountMessages(string userId);
        long CountWordPhrase(string wordPhrase);
        long CountWordPhrase(string userId, string wordPhrase);
        IEnumerable<MessageData> MessagesWithWordPhrase(string wordPhrase);
        IEnumerable<MessageData> MessagesWithWordPhrase(string userId, string wordPhrase);
    }
}