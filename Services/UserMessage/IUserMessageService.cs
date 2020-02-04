using System.Collections.Generic;
using System.Linq;
using AuthCX.Models;

namespace AuthCX.Services.UserMessage
{
    public interface IUserMessageService
    {
        IEnumerable<Models.UserMessage> GetUserMessages();
        IEnumerable<Models.UserMessage> GetUserMessages(string userId);
        IEnumerable<MessagesByKey> AggregateEmailDomain();
        IEnumerable<MessagesByKey> AggregateEmailDomain(string domain);
        
        IEnumerable<MessagesByKey> AggregateUserId();
        IEnumerable<MessagesByKey> AggregateUserId(string userId);
    }
}