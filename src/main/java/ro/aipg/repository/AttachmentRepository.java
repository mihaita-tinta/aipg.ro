package ro.aipg.repository;

import ro.aipg.domain.Attachment;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Attachment entity.
 */
@SuppressWarnings("unused")
public interface AttachmentRepository extends JpaRepository<Attachment,Long> {

    @Query("select attachment from Attachment attachment where attachment.user.login = ?#{principal.username}")
    List<Attachment> findByUserIsCurrentUser();

}
