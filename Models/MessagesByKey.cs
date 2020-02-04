using System.Collections.Generic;

namespace AuthCX.Models
{
    public class MessagesByKey
    {
        public string Key { get; set; }
        public IEnumerable<UserMessage> Messages { get; set; }

        public override string ToString()
        {
            return $"{nameof(Key)}: {Key}, {nameof(Messages)}: {Messages}";
        }
    }
}