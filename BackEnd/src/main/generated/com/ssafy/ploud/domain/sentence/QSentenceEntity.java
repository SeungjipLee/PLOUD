package com.ssafy.ploud.domain.sentence;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSentenceEntity is a Querydsl query type for SentenceEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSentenceEntity extends EntityPathBase<SentenceEntity> {

    private static final long serialVersionUID = 6091098L;

    public static final QSentenceEntity sentenceEntity = new QSentenceEntity("sentenceEntity");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath sentence = createString("sentence");

    public QSentenceEntity(String variable) {
        super(SentenceEntity.class, forVariable(variable));
    }

    public QSentenceEntity(Path<? extends SentenceEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSentenceEntity(PathMetadata metadata) {
        super(SentenceEntity.class, metadata);
    }

}

