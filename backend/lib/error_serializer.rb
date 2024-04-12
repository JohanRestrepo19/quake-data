# Inspired by https://jaketrent.com/post/jsonapi-errors-serializer-in-rails/
module ErrorSerializer
  # @param errors [ActiveModel::Errors]
  def serialize(errors)
    return if errors.nil?

    # @param field [Symbol]
    # @param err_msgs [Array<String>]
    # @type [Hash]
    parsed_errors = errors.to_hash(true).map do |field, err_msgs|
      err_msgs.map do |msg|
        { id: field, title: msg }
      end
    end

    parsed_errors = parsed_errors.flatten

    { errors: parsed_errors }
  end
end
