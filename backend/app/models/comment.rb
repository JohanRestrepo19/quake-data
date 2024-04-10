class Comment < ApplicationRecord
  belongs_to :feature

  # TODO: Validate body field
end
