using System.Collections.Generic;
using AuthCX.Models;

namespace AuthCX.Repositories.Message
{
    public interface IMessageRepo
    {
        IEnumerable<MessageData> GetMessages();
    }
}